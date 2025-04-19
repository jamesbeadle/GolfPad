import Types "../data-types/types";
import UserQueries "../queries/user_queries";
import UserCommands "../commands/user_commands";
import Result "mo:base/Result";
import Array "mo:base/Array";
import List "mo:base/List";
import Order "mo:base/Order";
import Time "mo:base/Time";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import Nat8 "mo:base/Nat8";
import Int8 "mo:base/Int8";
import Enums "mo:waterway-mops/Enums";
import Ids "mo:waterway-mops/Ids";
import Environment "../environment";


module {
  public class UserManager() {

    private var profiles: [Types.Profile] = [];
    private var predictions: [Types.Prediction] = [];

    public func getProfile(principalId: Ids.PrincipalId) : Result.Result<UserQueries.Profile, Enums.Error> {
      let profile = Array.find(profiles, func(entry: Types.Profile) : Bool {
        entry.principalId == principalId
      });
      switch(profile){
        case (?foundProfile){
          return #ok({
            joinedOn = foundProfile.joinedOn;
            principalId = foundProfile.principalId;
            username = foundProfile.username;
          })
        };
        case (null){ 
          return #err(#NotFound);
        }
      };
    };

    public func getPrediction(principalId: Ids.PrincipalId, dto: UserQueries.GetPrediction) : Result.Result<UserQueries.Prediction, Enums.Error> {
      return getPredictionScorecard(principalId, dto.tournamentId, dto.year);
    };

    public func getScorecard(dto: UserQueries.GetScorecard) : Result.Result<UserQueries.Prediction, Enums.Error> {
      return getPredictionScorecard(dto.principalId, dto.tournamentId, dto.year);
    };

    private func getPredictionScorecard(principalId: Ids.PrincipalId, tournamentId: Types.TournamentId, year: Nat16) : Result.Result<UserQueries.Prediction, Enums.Error> {
      let prediction = Array.find(predictions, func(entry: Types.Prediction) : Bool {
        entry.principalId == principalId and entry.tournamentId == tournamentId and entry.year == year;
      });
      switch(prediction){
        case (?foundPrediction){
          return #ok({
            hole1GolferId = foundPrediction.hole1GolferId;
            hole1Score = foundPrediction.hole1Score;
            hole2GolferId = foundPrediction.hole2GolferId;
            hole2Score = foundPrediction.hole2Score;
            hole3GolferId = foundPrediction.hole3GolferId;
            hole3Score = foundPrediction.hole3Score;
            hole4GolferId = foundPrediction.hole4GolferId;
            hole4Score = foundPrediction.hole4Score;
            hole5GolferId = foundPrediction.hole5GolferId;
            hole5Score = foundPrediction.hole5Score;
            hole6GolferId = foundPrediction.hole6GolferId;
            hole6Score = foundPrediction.hole6Score;
            hole7GolferId = foundPrediction.hole7GolferId;
            hole7Score = foundPrediction.hole7Score;
            hole8GolferId = foundPrediction.hole8GolferId;
            hole8Score = foundPrediction.hole8Score;
            hole9GolferId = foundPrediction.hole9GolferId;
            hole9Score = foundPrediction.hole9Score;
            hole10GolferId = foundPrediction.hole10GolferId;
            hole10Score = foundPrediction.hole10Score;
            hole11GolferId = foundPrediction.hole11GolferId;
            hole11Score = foundPrediction.hole11Score;
            hole12GolferId = foundPrediction.hole12GolferId;
            hole12Score = foundPrediction.hole12Score;
            hole13GolferId = foundPrediction.hole13GolferId;
            hole13Score = foundPrediction.hole13Score;
            hole14GolferId = foundPrediction.hole14GolferId;
            hole14Score = foundPrediction.hole14Score;
            hole15GolferId = foundPrediction.hole15GolferId;
            hole15Score = foundPrediction.hole15Score;
            hole16GolferId = foundPrediction.hole16GolferId;
            hole16Score = foundPrediction.hole16Score;
            hole17GolferId = foundPrediction.hole17GolferId;
            hole17Score = foundPrediction.hole17Score;
            hole18GolferId = foundPrediction.hole18GolferId;
            hole18Score = foundPrediction.hole18Score;
            principalId = foundPrediction.principalId;
            tournamentId = foundPrediction.tournamentId;
            username = foundPrediction.username;
            year = foundPrediction.year;
            swap1Used = foundPrediction.swap1Used;
            swap2Used = foundPrediction.swap2Used;
            swap3Used = foundPrediction.swap3Used;
          })
        };
        case (null){ 
          return #err(#NotFound);
        }
      };
    };

    public func listPredictions(principalId: Ids.PrincipalId, dto: UserQueries.ListPredictions) : Result.Result<UserQueries.Predictions, Enums.Error> {

      let userPredictions = Array.filter<Types.Prediction>(predictions, func(entry: Types.Prediction){
        entry.principalId == principalId;
      });
      let allEntries = List.fromArray(userPredictions);
      let startIndex = dto.page * Environment.PAGINATION_ROW_COUNT;
      let droppedEntries = List.drop<Types.Prediction>(allEntries, startIndex);
      let paginatedEntires = List.take<Types.Prediction>(droppedEntries, Environment.PAGINATION_ROW_COUNT);
      let mappedEntries = List.map<Types.Prediction, UserQueries.PredictionSummary>(paginatedEntires, func(entry: Types.Prediction){
        return {
          principalId = principalId;
          totalScore = entry.totalScore;
          totalShots = entry.totalShots;
          tournamentId = entry.tournamentId;
          year = entry.year;
          createdOn = entry.createdOn;
        }
      });

      let sortedPredictions = Array.sort(List.toArray(mappedEntries), func(a: UserQueries.PredictionSummary, b: UserQueries.PredictionSummary) : Order.Order {
        if (a.createdOn > b.createdOn) { #less } 
        else if (a.createdOn < b.createdOn) { #greater }
        else { #equal }
      });

      return #ok({
        entries = sortedPredictions;
        page = dto.page;
        totalEntries = List.size(allEntries);
      });
    };

    public func createProfile(principalId: Ids.PrincipalId, dto: UserCommands.CreateProfile) : Result.Result<(), Enums.Error> {
      let existingProfile = Array.find(profiles, func(profile: Types.Profile) : Bool {
        profile.principalId == principalId;
      });
      switch(existingProfile) {
        case(?_) { 
          return #err(#AlreadyExists);   
        };
        case(null) {
          
          let newProfile: Types.Profile = {
            joinedOn = Time.now();
            principalId;
            profilePicture = dto.profilePicture;
            username = dto.username;
          };

          let profileBuffer = Buffer.fromArray<Types.Profile>(profiles);
          profileBuffer.add(newProfile);
          profiles := Buffer.toArray(profileBuffer);

          return #ok();
        };
      };
    };

    public func updateProfilePicture(principalId: Ids.PrincipalId, dto: UserCommands.UpdateProfilePicture) : Result.Result<(), Enums.Error> {
      let existingProfile = Array.find(profiles, func(profile: Types.Profile) : Bool {
        profile.principalId == principalId;
      });
      switch(existingProfile) {
        case(?foundProfile) { 
          
          let updatedProfile: Types.Profile = {
            joinedOn = foundProfile.joinedOn;
            principalId = foundProfile.principalId;
            profilePicture = dto.profilePicture;
            username = foundProfile.username;
          };

          profiles := Array.map<Types.Profile, Types.Profile>(profiles, func(entry: Types.Profile){
            if(entry.principalId == principalId){
              return updatedProfile;
            };
            return entry;
          });

          return #ok();
        };
        case(null) {
          return #err(#NotFound);   
        };
      };
    };

    public func updateUsername(principalId: Ids.PrincipalId, dto: UserCommands.UpdateUsername) : Result.Result<(), Enums.Error> {
      let existingProfile = Array.find(profiles, func(profile: Types.Profile) : Bool {
        profile.principalId == principalId;
      });
      switch(existingProfile) {
        case(?foundProfile) { 
          
          let updatedProfile: Types.Profile = {
            joinedOn = foundProfile.joinedOn;
            principalId = foundProfile.principalId;
            profilePicture = foundProfile.profilePicture;
            username = dto.username;
          };

          profiles := Array.map<Types.Profile, Types.Profile>(profiles, func(entry: Types.Profile){
            if(entry.principalId == principalId){
              return updatedProfile;
            };
            return entry;
          });

          return #ok();
        };
        case(null) {
          return #err(#NotFound);   
        };
      };
    };

    public func submitPrediction(principalId: Ids.PrincipalId, username: Text, dto: UserCommands.SubmitPrediction) : Result.Result<(), Enums.Error> {
      let existingPrediction = Array.find(predictions, func(entry: Types.Prediction) : Bool {
        entry.principalId == principalId
      });
      
      switch(existingPrediction){
        case (?foundPrediction){
          predictions := Array.map<Types.Prediction, Types.Prediction>(predictions, func(entry: Types.Prediction){
            if(entry.principalId == principalId){
              return {
                createdOn = foundPrediction.createdOn;
                hole10GolferId = dto.hole10GolferId;
                hole10Score = foundPrediction.hole10Score;
                hole11GolferId = dto.hole11GolferId;
                hole11Score = foundPrediction.hole11Score;
                hole12GolferId = dto.hole12GolferId;
                hole12Score = foundPrediction.hole12Score;
                hole13GolferId = dto.hole13GolferId;
                hole13Score = foundPrediction.hole13Score;
                hole14GolferId = dto.hole14GolferId;
                hole14Score = foundPrediction.hole14Score;
                hole15GolferId = dto.hole15GolferId;
                hole15Score = foundPrediction.hole15Score;
                hole16GolferId = dto.hole16GolferId;
                hole16Score = foundPrediction.hole16Score;
                hole17GolferId = dto.hole17GolferId;
                hole17Score = foundPrediction.hole17Score;
                hole18GolferId = dto.hole18GolferId;
                hole18Score = foundPrediction.hole18Score;
                hole1GolferId = dto.hole1GolferId;
                hole1Score = foundPrediction.hole1Score;
                hole2GolferId = dto.hole2GolferId;
                hole2Score = foundPrediction.hole2Score;
                hole3GolferId = dto.hole3GolferId;
                hole3Score = foundPrediction.hole3Score;
                hole4GolferId = dto.hole4GolferId;
                hole4Score = foundPrediction.hole4Score;
                hole5GolferId = dto.hole5GolferId;
                hole5Score = foundPrediction.hole5Score;
                hole6GolferId = dto.hole6GolferId;
                hole6Score = foundPrediction.hole6Score;
                hole7GolferId = dto.hole7GolferId;
                hole7Score = foundPrediction.hole7Score;
                hole8GolferId = dto.hole8GolferId;
                hole8Score = foundPrediction.hole8Score;
                hole9GolferId = dto.hole9GolferId;
                hole9Score = foundPrediction.hole9Score;
                principalId = foundPrediction.principalId;
                totalScore = foundPrediction.totalScore;
                totalShots = foundPrediction.totalShots;
                tournamentId = foundPrediction.tournamentId;
                username = foundPrediction.username;
                year = foundPrediction.year;
                swap1Used = false;
                swap2Used = false;
                swap3Used = false;
              }
            };
            return entry;
          });
        };
        case (null){
          let newPrediction: Types.Prediction = {
            createdOn = Time.now();
            hole10GolferId = dto.hole10GolferId;
            hole10Score = 0;
            hole11GolferId = dto.hole11GolferId;
            hole11Score = 0;
            hole12GolferId = dto.hole12GolferId;
            hole12Score = 0;
            hole13GolferId = dto.hole13GolferId;
            hole13Score = 0;
            hole14GolferId = dto.hole14GolferId;
            hole14Score = 0;
            hole15GolferId = dto.hole15GolferId;
            hole15Score = 0;
            hole16GolferId = dto.hole16GolferId;
            hole16Score = 0;
            hole17GolferId = dto.hole17GolferId;
            hole17Score = 0;
            hole18GolferId = dto.hole18GolferId;
            hole18Score = 0;
            hole1GolferId = dto.hole1GolferId;
            hole1Score = 0;
            hole2GolferId = dto.hole2GolferId;
            hole2Score = 0;
            hole3GolferId = dto.hole3GolferId;
            hole3Score = 0;
            hole4GolferId = dto.hole4GolferId;
            hole4Score = 0;
            hole5GolferId = dto.hole5GolferId;
            hole5Score = 0;
            hole6GolferId = dto.hole6GolferId;
            hole6Score = 0;
            hole7GolferId = dto.hole7GolferId;
            hole7Score = 0;
            hole8GolferId = dto.hole8GolferId;
            hole8Score = 0;
            hole9GolferId = dto.hole9GolferId;
            hole9Score = 0;
            principalId = principalId;
            totalScore = 0;
            totalShots = 0;
            tournamentId = dto.tournamentId;
            username = username;
            year = dto.year;
            swap1Used = false;
            swap2Used = false;
            swap3Used = false;
          };
          
          let predictionBuffer = Buffer.fromArray<Types.Prediction>(predictions);
          predictionBuffer.add(newPrediction);
          predictions := Buffer.toArray<Types.Prediction>(predictionBuffer);
        }
      };

      return #ok();
    };

    public func swapGolfer(principalId: Ids.PrincipalId, dto: UserCommands.SwapGolfer, round: Nat8) : Result.Result<(), Enums.Error> {
      let existingPrediction = Array.find(predictions, func(entry: Types.Prediction) : Bool {
        entry.principalId == principalId
      });
      
      switch(existingPrediction){
        case (?foundPrediction){
          predictions := Array.map<Types.Prediction, Types.Prediction>(predictions, func(entry: Types.Prediction){
            if(entry.principalId == principalId){

              var swap1Used = entry.swap1Used;
              var swap2Used = entry.swap2Used;
              var swap3Used = entry.swap3Used;

              //TODO actually swap the golfer 

              switch(round){
                case (1){
                  swap1Used := true;
                };
                case (2){
                  swap2Used := true;
                };
                case (3){
                  swap3Used := true;
                };
                case _{}
              };

              var hole1GolferId = entry.hole1GolferId;
              var hole2GolferId = entry.hole1GolferId;
              var hole3GolferId = entry.hole1GolferId;
              var hole4GolferId = entry.hole1GolferId;
              var hole5GolferId = entry.hole1GolferId;
              var hole6GolferId = entry.hole1GolferId;
              var hole7GolferId = entry.hole1GolferId;
              var hole8GolferId = entry.hole1GolferId;
              var hole9GolferId = entry.hole1GolferId;
              var hole10GolferId = entry.hole1GolferId;
              var hole11GolferId = entry.hole1GolferId;
              var hole12GolferId = entry.hole1GolferId;
              var hole13GolferId = entry.hole1GolferId;
              var hole14GolferId = entry.hole1GolferId;
              var hole15GolferId = entry.hole1GolferId;
              var hole16GolferId = entry.hole1GolferId;
              var hole17GolferId = entry.hole1GolferId;
              var hole18GolferId = entry.hole1GolferId;
              
              return {
                createdOn = foundPrediction.createdOn;
                hole10GolferId = hole10GolferId;
                hole10Score = foundPrediction.hole10Score;
                hole11GolferId = hole11GolferId;
                hole11Score = foundPrediction.hole11Score;
                hole12GolferId = hole12GolferId;
                hole12Score = foundPrediction.hole12Score;
                hole13GolferId = hole13GolferId;
                hole13Score = foundPrediction.hole13Score;
                hole14GolferId = hole14GolferId;
                hole14Score = foundPrediction.hole14Score;
                hole15GolferId = hole15GolferId;
                hole15Score = foundPrediction.hole15Score;
                hole16GolferId = hole16GolferId;
                hole16Score = foundPrediction.hole16Score;
                hole17GolferId = hole17GolferId;
                hole17Score = foundPrediction.hole17Score;
                hole18GolferId = hole18GolferId;
                hole18Score = foundPrediction.hole18Score;
                hole1GolferId = hole1GolferId;
                hole1Score = foundPrediction.hole1Score;
                hole2GolferId = hole2GolferId;
                hole2Score = foundPrediction.hole2Score;
                hole3GolferId = hole3GolferId;
                hole3Score = foundPrediction.hole3Score;
                hole4GolferId = hole4GolferId;
                hole4Score = foundPrediction.hole4Score;
                hole5GolferId = hole5GolferId;
                hole5Score = foundPrediction.hole5Score;
                hole6GolferId = hole6GolferId;
                hole6Score = foundPrediction.hole6Score;
                hole7GolferId = hole7GolferId;
                hole7Score = foundPrediction.hole7Score;
                hole8GolferId = hole8GolferId;
                hole8Score = foundPrediction.hole8Score;
                hole9GolferId = hole9GolferId;
                hole9Score = foundPrediction.hole9Score;
                principalId = foundPrediction.principalId;
                totalScore = foundPrediction.totalScore;
                totalShots = foundPrediction.totalShots;
                tournamentId = foundPrediction.tournamentId;
                username = foundPrediction.username;
                year = foundPrediction.year;
                swap1Used;
                swap2Used;
                swap3Used;
              }
            };
            return entry;
          });

          return #ok();
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func calculateScorecards(leaderboard: Types.TournamentLeaderboard, golfCourse: Types.GolfCourse) {
    
      let predictionBuffer = Buffer.fromArray<Types.Prediction>(predictions);
    
      for (i in Iter.range(0, predictions.size() - 1)) {
        let prediction = predictions[i];
        
        let (hole1Score, hole2Score, hole3Score, hole4Score, hole5Score, hole6Score, hole7Score, hole8Score, hole9Score,
             hole10Score, hole11Score, hole12Score, hole13Score, hole14Score, hole15Score, hole16Score, hole17Score, hole18Score) = do {
          let hole1Score : Nat8 = getBestHoleScore(leaderboard, prediction.hole1GolferId, 1);
          let hole2Score : Nat8 = getBestHoleScore(leaderboard, prediction.hole2GolferId, 2);
          let hole3Score : Nat8 = getBestHoleScore(leaderboard, prediction.hole3GolferId, 3);
          let hole4Score : Nat8 = getBestHoleScore(leaderboard, prediction.hole4GolferId, 4);
          let hole5Score : Nat8 = getBestHoleScore(leaderboard, prediction.hole5GolferId, 5);
          let hole6Score : Nat8 = getBestHoleScore(leaderboard, prediction.hole6GolferId, 6);
          let hole7Score : Nat8 = getBestHoleScore(leaderboard, prediction.hole7GolferId, 7);
          let hole8Score : Nat8 = getBestHoleScore(leaderboard, prediction.hole8GolferId, 8);
          let hole9Score : Nat8 = getBestHoleScore(leaderboard, prediction.hole9GolferId, 9);
          let hole10Score : Nat8 = getBestHoleScore(leaderboard, prediction.hole10GolferId, 10);
          let hole11Score : Nat8 = getBestHoleScore(leaderboard, prediction.hole11GolferId, 11);
          let hole12Score : Nat8 = getBestHoleScore(leaderboard, prediction.hole12GolferId, 12);
          let hole13Score : Nat8 = getBestHoleScore(leaderboard, prediction.hole13GolferId, 13);
          let hole14Score : Nat8 = getBestHoleScore(leaderboard, prediction.hole14GolferId, 14);
          let hole15Score : Nat8 = getBestHoleScore(leaderboard, prediction.hole15GolferId, 15);
          let hole16Score : Nat8 = getBestHoleScore(leaderboard, prediction.hole16GolferId, 16);
          let hole17Score : Nat8 = getBestHoleScore(leaderboard, prediction.hole17GolferId, 17);
          let hole18Score : Nat8 = getBestHoleScore(leaderboard, prediction.hole18GolferId, 18);
          (hole1Score, hole2Score, hole3Score, hole4Score, hole5Score, hole6Score, hole7Score, hole8Score, hole9Score,
          hole10Score, hole11Score, hole12Score, hole13Score, hole14Score, hole15Score, hole16Score, hole17Score, hole18Score)
        };
        
        let totalShots : Nat8 = do {
            let shots : [Nat8] = [
                hole1Score,
                hole2Score,
                hole3Score,
                hole4Score,
                hole5Score,
                hole6Score,
                hole7Score,
                hole8Score,
                hole9Score,
                hole10Score,
                hole11Score,
                hole12Score,
                hole13Score,
                hole14Score,
                hole15Score,
                hole16Score,
                hole17Score,
                hole18Score
            ];
            Array.foldLeft<Nat8, Nat8>(shots, 0, func(sum, shot) { sum + shot })
        };
        
        let totalScore : Int8 = do {
            Int8.fromInt(Nat8.toNat(totalShots) - Nat8.toNat(golfCourse.par))
        };
        
        let updatedPrediction : Types.Prediction = {
            createdOn = prediction.createdOn;
            principalId = prediction.principalId;
            tournamentId = prediction.tournamentId;
            username = prediction.username;
            year = prediction.year;
            swap1Used = prediction.swap1Used;
            swap2Used = prediction.swap2Used;
            swap3Used = prediction.swap3Used;
            hole1GolferId = prediction.hole1GolferId;
            hole1Score = hole1Score;
            hole2GolferId = prediction.hole2GolferId;
            hole2Score = hole2Score;
            hole3GolferId = prediction.hole3GolferId;
            hole3Score = hole3Score;
            hole4GolferId = prediction.hole4GolferId;
            hole4Score = hole4Score;
            hole5GolferId = prediction.hole5GolferId;
            hole5Score = hole5Score;
            hole6GolferId = prediction.hole6GolferId;
            hole6Score = hole6Score;
            hole7GolferId = prediction.hole7GolferId;
            hole7Score = hole7Score;
            hole8GolferId = prediction.hole8GolferId;
            hole8Score = hole8Score;
            hole9GolferId = prediction.hole9GolferId;
            hole9Score = hole9Score;
            hole10GolferId = prediction.hole10GolferId;
            hole10Score = hole10Score;
            hole11GolferId = prediction.hole11GolferId;
            hole11Score = hole11Score;
            hole12GolferId = prediction.hole12GolferId;
            hole12Score = hole12Score;
            hole13GolferId = prediction.hole13GolferId;
            hole13Score = hole13Score;
            hole14GolferId = prediction.hole14GolferId;
            hole14Score = hole14Score;
            hole15GolferId = prediction.hole15GolferId;
            hole15Score = hole15Score;
            hole16GolferId = prediction.hole16GolferId;
            hole16Score = hole16Score;
            hole17GolferId = prediction.hole17GolferId;
            hole17Score = hole17Score;
            hole18GolferId = prediction.hole18GolferId;
            hole18Score = hole18Score;
            
            totalShots = totalShots;
            totalScore = totalScore;
        };
        
        predictionBuffer.put(i, updatedPrediction);
      };
    
      predictions := Buffer.toArray(predictionBuffer);
    };

    private func getBestHoleScore(leaderboard: Types.TournamentLeaderboard, golferId: Types.GolferId, holeNumber: Nat) : Nat8 {
        let golferEntry = Array.find(leaderboard.entries, func(entry: Types.TournamentLeaderboardEntry) : Bool {
            entry.golferId == golferId
        });
        
        switch (golferEntry) {
            case (?entry) {
                let scores = Buffer.Buffer<Nat8>(4);
                for (round in Iter.fromArray(entry.rounds)) {
                    let score: Nat8 = switch (holeNumber) {
                        case (1) round.hole1Score;
                        case (2) round.hole2Score;
                        case (3) round.hole3Score;
                        case (4) round.hole4Score;
                        case (5) round.hole5Score;
                        case (6) round.hole6Score;
                        case (7) round.hole7Score;
                        case (8) round.hole8Score;
                        case (9) round.hole9Score;
                        case (10) round.hole10Score;
                        case (11) round.hole11Score;
                        case (12) round.hole12Score;
                        case (13) round.hole13Score;
                        case (14) round.hole14Score;
                        case (15) round.hole15Score;
                        case (16) round.hole16Score;
                        case (17) round.hole17Score;
                        case (18) round.hole18Score;
                        case (_) 0;
                    };
                    scores.add(score);
                };
                let validScores = Array.filter<Nat8>(Buffer.toArray(scores), func(score: Nat8) : Bool { score > 0 });
                if (validScores.size() == 0) { return 0 };
                return Array.foldLeft<Nat8, Nat8>(validScores, validScores[0], func(min, score) { if (score < min) { score } else { min } });
            };
            case (null) { 0 };
        };
    };

    public func getTotalLeaderboardEntries(tournamentId: Types.TournamentId) : Nat {
      let leaderboardEntries = Array.filter<Types.Prediction>(predictions, func(entry: Types.Prediction){
        entry.tournamentId == tournamentId
      });
      return Array.size(leaderboardEntries);
    };

    public func getLeaderboardChunk(tournamentId: Types.TournamentId, chunkIndex: Nat) : [Types.Prediction]{
      // TODO
      return [];
    };

    public func getStableProfiles() : [Types.Profile] {
      return profiles;
    };

    public func getStablePredictions() : [Types.Prediction] {
      return predictions;
    };

    public func setStableProfiles(stable_profiles: [Types.Profile]){
      profiles := stable_profiles;
    };

    public func setStablePredictions(stable_predictions: [Types.Prediction]){
      predictions := stable_predictions;
    };

  };
};


    