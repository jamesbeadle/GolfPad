import { writable } from "svelte/store";
import type {
  AcceptTeamRequest,
  AddGolfTeamMember,
  CreateGolfTeam,
  DeleteGolfTeam,
  GetGolfTeamRequests,
  GetGolfTeams,
  GolfTeam,
  GolfTeamRequests,
  GolfTeams,
  RejectTeamRequest,
  RemoveGolfTeamMember,
  UpdateGolfTeamName,
  UpdateGolfTeamPicture,
} from "../../../../declarations/backend/backend.did";
import { GolfTeamService } from "$lib/services/golf-team-service";

function createGolfTeamStore() {
  
  async function getGolfTeams(dto: GetGolfTeams): Promise<GolfTeams> {
    return new GolfTeamService().getGolfTeams(dto);
  }
  
  async function getGolfTeamRequests(dto: GetGolfTeamRequests): Promise<GolfTeamRequests> {
    return new GolfTeamService().getGolfTeamRequests(dto);
  }
  
  async function createGolfTeam(dto: CreateGolfTeam): Promise<void> {
    return new GolfTeamService().createGolfTeam(dto);
  }
  
  async function updateGolfTeamName(dto: UpdateGolfTeamName): Promise<void> {
    return new GolfTeamService().updateGolfTeamName(dto);
  }
  
  async function updateGolfTeamPicture(dto: UpdateGolfTeamPicture): Promise<void> {
    return new GolfTeamService().updateGolfTeamPicture(dto);
  }
  
  async function deleteGolfTeam(dto: DeleteGolfTeam): Promise<void> {
    return new GolfTeamService().deleteGolfTeam(dto);
  }
  
  async function addGolfTeamMember(dto: AddGolfTeamMember): Promise<void> {
    return new GolfTeamService().addGolfTeamMember(dto);
  }
  
  async function removeGolfTeamMember(dto: RemoveGolfTeamMember): Promise<void> {
    return new GolfTeamService().removeGolfTeamMember(dto);
  }
  
  async function acceptTeamRequest(dto: AcceptTeamRequest): Promise<void> {
    return new GolfTeamService().acceptTeamRequest(dto);
  }
  
  async function rejectTeamRequest(dto: RejectTeamRequest): Promise<void> {
    return new GolfTeamService().rejectTeamRequest(dto);
  }

  return {
    getGolfTeams,
    getGolfTeamRequests,
    createGolfTeam,
    updateGolfTeamName,
    updateGolfTeamPicture,
    deleteGolfTeam,
    addGolfTeamMember,
    removeGolfTeamMember,
    acceptTeamRequest,
    rejectTeamRequest
  };
}

export const golfTeamStore = createGolfTeamStore();
