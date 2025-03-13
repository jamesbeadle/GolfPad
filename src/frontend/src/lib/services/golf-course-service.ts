import { isError } from "$lib/utils/helpers";
import { idlFactory } from "../../../../declarations/backend";
import type {
  CreateGolfCourse,
  GetGolfCourse,
  GetGolfCourses,
  GolfCourse,
  GolfCourses,
} from "../../../../declarations/backend/backend.did";
import { ActorFactory } from "$lib/utils/actor.factory";
import { authStore } from "$lib/stores/auth-store";
import type { OptionIdentity } from "$lib/types/identity";
import { IDL } from "@dfinity/candid";
import { createAgent } from "@dfinity/utils";
import { SnsGovernanceCanister } from "@dfinity/sns";
import { Principal } from "@dfinity/principal";
import type { Command, ExecuteGenericNervousSystemFunction } from "@dfinity/sns/dist/candid/sns_governance";
import type UpdateGolfCourse from "$lib/components/goverance/golf-course/update-golf-course.svelte";

const AddGolfCourse_Idl = IDL.Record({
  name: IDL.Text,
  friendlyName: IDL.Text,
  thirdColourHex: IDL.Text,
  primaryColourHex: IDL.Text,
  secondaryColourHex: IDL.Text,
  abbreviatedName: IDL.Text,
});

export class GolfCoursesService {
  constructor() {}

  

  //Queries

  async getGolfCourses(dto: GetGolfCourses): Promise<GolfCourses> {
    const identityActor: any = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result = await identityActor.getGolfCourses(dto);
    if (isError(result)) throw new Error("Failed to get golf courses");
    return result.ok;
  }

  async getGolfCourse(dto: GetGolfCourse): Promise<GolfCourse> {
    const identityActor: any = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result = await identityActor.getGolfCourse(dto);
    if (isError(result)) throw new Error("Failed to get golf course");
    return result.ok;
  }

  async addGolfCourse(dto: CreateGolfCourse){
    let userIdentity: OptionIdentity;
    authStore.subscribe((auth) => (userIdentity = auth.identity));
    if (!userIdentity) return;

    const encoded = IDL.encode([AddGolfCourse_Idl], [dto]);

    const title = `Add ${dto.name} as Golf Course`;
    const summary = `Add ${dto.name} as Golf Course`;
    await this.createProposal({identity: userIdentity, functionId: 1_000n, payload: new Uint8Array(encoded), title, summary});
  }

  async updateGolfCourse(dto: UpdateGolfCourse){
    let userIdentity: OptionIdentity;
    authStore.subscribe((auth) => (userIdentity = auth.identity));
    if (!userIdentity) return;

    const encoded = IDL.encode([AddGolfCourse_Idl], [dto]);

    const title = `Update ${dto.name} Golf Course Information`;
    const summary = `Update ${dto.name} Golf Course Information`;
    await this.createProposal({identity: userIdentity, functionId: 2_000n, payload: new Uint8Array(encoded), title, summary});
  }

    
  async createProposal({
    identity,
    functionId,
    payload,
    title,
    summary,
  }: {
    identity: OptionIdentity;
    functionId: bigint;
    payload: Uint8Array;
    title: string;
    summary: string;
  }) {
    if (!identity) throw new Error("No identity to propose with");

    const agent = await createAgent({
      identity,
      host: import.meta.env.VITE_AUTH_PROVIDER_URL,
      fetchRootKey: process.env.DFX_NETWORK === "local",
    });

    const { manageNeuron, listNeurons } = SnsGovernanceCanister.create({
      canisterId: Principal.fromText(
        process.env.SNS_GOVERNANCE_CANISTER_ID ?? "",
      ),
      agent,
    });

    const userNeurons = await listNeurons({
      principal: identity.getPrincipal(),
      limit: 10,
      beforeNeuronId: { id: [] },
    });
    if (userNeurons.length === 0) {
      throw new Error("No neurons found for this principal; cannot propose");
    }

    const neuronId = userNeurons[0].id[0];
    if (!neuronId) throw new Error("Neuron has no subaccount ID");

    const fn: ExecuteGenericNervousSystemFunction = {
      function_id: functionId,
      payload,
    };
    const command: Command = {
      MakeProposal: {
        title,
        url: "openfpl.xyz/governance",
        summary,
        action: [{ ExecuteGenericNervousSystemFunction: fn }],
      },
    };

    return await manageNeuron({
      subaccount: neuronId.id,
      command: [command],
    });
  }

}
