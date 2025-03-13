import { isError } from "$lib/utils/helpers";
import { ActorFactory } from "$lib/utils/actor.factory";
import type {
  AcceptTeamRequest,
  AddGolfTeamMember,
  CreateGolfTeam,
  DeleteGolfTeam,
  GetGolfTeamRequests,
  GetGolfTeams,
  GolfTeamRequests,
  GolfTeams,
  RejectTeamRequest,
  RemoveGolfTeamMember,
  UpdateGolfTeamName,
  UpdateGolfTeamPicture,
} from "../../../../declarations/backend/backend.did";
import { authStore } from "$lib/stores/auth-store";

export class GolfTeamService {
  constructor() {}

  //Queries

  async getGolfTeams(dto: GetGolfTeams): Promise<GolfTeams> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );

      let result = await identityActor.getGolfTeams(dto);

      if (isError(result)) {
        console.error("Error Fetching Golf Teams", result);
      }

      return result.ok;
    } catch (error) {
      console.error("Error Fetching Golf Teams", error);
      throw error;
    }
  }

  async getGolfTeamRequests(
    dto: GetGolfTeamRequests,
  ): Promise<GolfTeamRequests> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );

      let result = await identityActor.getGolfTeamRequests(dto);

      if (isError(result)) {
        console.error("Error Fetching Golf Team Requests", result);
      }

      return result.ok;
    } catch (error) {
      console.error("Error Fetching Golf Team Requests", error);
      throw error;
    }
  }

  //Commands

  async createGolfTeam(dto: CreateGolfTeam): Promise<any> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.createGolfTeam(dto);
      return result.ok;
    } catch (error) {
      console.error("Error creating golf team:", error);
      throw error;
    }
  }

  async updateGolfTeamName(dto: UpdateGolfTeamName): Promise<any> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.updateGolfTeamName(dto);
      return result.ok;
    } catch (error) {
      console.error("Error updating golf team name:", error);
      throw error;
    }
  }

  async updateGolfTeamPicture(dto: UpdateGolfTeamPicture): Promise<any> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.updateGolfTeamPicture(dto);
      return result.ok;
    } catch (error) {
      console.error("Error updating golf team picture:", error);
      throw error;
    }
  }

  async deleteGolfTeam(dto: DeleteGolfTeam): Promise<any> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.deleteGolfTeam(dto);
      return result.ok;
    } catch (error) {
      console.error("Error deleting golf team:", error);
      throw error;
    }
  }

  async addGolfTeamMember(dto: AddGolfTeamMember): Promise<any> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.addGolfTeamMember(dto);
      return result.ok;
    } catch (error) {
      console.error("Error adding golf team member:", error);
      throw error;
    }
  }

  async removeGolfTeamMember(dto: RemoveGolfTeamMember): Promise<any> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.removeGolfTeamMember(dto);
      return result.ok;
    } catch (error) {
      console.error("Error removing golf team member:", error);
      throw error;
    }
  }

  async acceptTeamRequest(dto: AcceptTeamRequest): Promise<any> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.acceptTeamRequest(dto);
      return result.ok;
    } catch (error) {
      console.error("Error accepting team request:", error);
      throw error;
    }
  }

  async rejectTeamRequest(dto: RejectTeamRequest): Promise<any> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.rejectTeamRequest(dto);
      return result.ok;
    } catch (error) {
      console.error("Error rejecting team request:", error);
      throw error;
    }
  }
}
