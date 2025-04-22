import { ActorFactory } from "$lib/utils/actor.factory";
import { isError } from "$lib/utils/helpers";
import { authStore } from "$lib/stores/auth-store";
import type { GetPrediction, Prediction, Predictions, PredictionSummary, SubmitPrediction } from "../../../../declarations/backend/backend.did";

export class PredictionService {
    constructor() {}

    newPrediction = {
        principalId: "",
        createdOn: 0,
        username: "",
        tournamentId: 0,
        year: 0,
        hole1GolferId: 0,
        hole2GolferId: 0,
        hole3GolferId: 0,
        hole4GolferId: 0,
        hole5GolferId: 0,
        hole6GolferId: 0,
        hole7GolferId: 0,
        hole8GolferId: 0,
        hole9GolferId: 0,
        hole10GolferId: 0,
        hole11GolferId: 0,
        hole12GolferId: 0,
        hole13GolferId: 0,
        hole14GolferId: 0,
        hole15GolferId: 0,
        hole16GolferId: 0,
        hole17GolferId: 0,
        hole18GolferId: 0,
        hole1Score: 0,
        hole2Score: 0,
        hole3Score: 0,
        hole4Score: 0,
        hole5Score: 0,
        hole6Score: 0,
        hole7Score: 0,
        hole8Score: 0,
        hole9Score: 0,
        hole10Score: 0,
        hole11Score: 0,
        hole12Score: 0,
        hole13Score: 0,
        hole14Score: 0,
        hole15Score: 0,
        hole16Score: 0,
        hole17Score: 0,
        hole18Score: 0,
        swap1Used: false,
        swap2Used: false,
        swap3Used: false
    }
    
    async getPrediction(dto: GetPrediction): Promise<Prediction> {
        try {
            const identityActor: any = await ActorFactory.createIdentityActor(
              authStore,
              process.env.BACKEND_CANISTER_ID ?? "",
            );
      
            let result = await identityActor.getPrediction(dto);
      
            if (isError(result)) {
              console.error("Error Getting Prediction", result);
            }
      
            return result.ok;
        } catch (error) {
            console.error("Error Getting Prediction", error);
            return this.newPrediction
        }
    }

    async submitPrediction(dto: SubmitPrediction): Promise<any> {
        try {
            const identityActor: any = await ActorFactory.createIdentityActor(
              authStore,
              process.env.BACKEND_CANISTER_ID ?? "",
            );
      
            let result = await identityActor.submitPrediction(dto);
      
            if (isError(result)) {
              console.error("Error Submitting Prediction", result);
            }
      
            return result.ok;
        } catch (error) {
            console.error("Error Submitting Prediction", error);
            throw error;
        }
    }
}