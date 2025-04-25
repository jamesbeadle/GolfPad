import { PredictionService } from "$lib/services/prediction-service";
import type {
  GetPrediction,
  Prediction,
  Predictions,
  PredictionSummary,
  SubmitPrediction,
} from "../../../../declarations/backend/backend.did";

function createPredictionStore() {
  async function getPrediction(dto: GetPrediction): Promise<Prediction> {
    return new PredictionService().getPrediction(dto);
  }

  async function submitPrediction(dto: SubmitPrediction): Promise<any> {
    return new PredictionService().submitPrediction(dto);
  }

  return {
    getPrediction,
    submitPrediction,
  };
}

export const predictionStore = createPredictionStore();
