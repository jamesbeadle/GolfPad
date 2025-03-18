import Base "mo:waterway-mops/BaseTypes";
import Blob "mo:base/Blob";
import ID "id_types";

module GolfCourseTypes {

  public type TeeGroupIndex = Nat8;
  public type GolfCourseVersion = Nat8;

  public type GolfCourse = {
    id : Nat;
    name : Text;
    founded : Int;
    totalHoles : Nat8;
    teeGroups : [TeeGroup];
    dateAdded : Int;
    status : CourseStatus;
    history : [HistoricalGolfCourse];
    activeVersion : GolfCourseVersion;
    mainImage : ?Blob;
    mainImageExtension : Text;
    bannerImage : ?Blob;
    courseAlbums : [GolfCourseAlbum];
    courseImages : [GolfCourseImage];
    countryId : ID.CountryId;
    manager: Base.PrincipalId;
  };

  public type GolfCourseImage = {
    image_id : Nat;
    album_id : Nat;
    added : Int;
    visible : Bool;
  };

  public type GolfCourseAlbum = {
    album_title : Text;
    image_ids : [Nat];
    created_by : Base.PrincipalId;
    created_on : Int;
    visible : Bool;
  };

  public type HistoricalGolfCourse = {
    id : Nat;
    version : GolfCourseVersion;
    name : Text;
    teeGroups : [TeeGroup];
    dateAdded : Int;
    status : CourseStatus;
  };

  public type CourseStatus = {
    #Active;
    #Hidden;
    #Restricted;
    #Excluded;
  };

  public type TeeGroup = {
    index : TeeGroupIndex;
    name : Text;
    colour : Text;
    added : Int;
    holes : [Hole];
  };
  public type GolfCourseSnapshot = {
    courseId : ID.GolfCourseId;
    courseVersion : GolfCourseVersion;
    teeGroupIndex : TeeGroupIndex;
  };

  public type Hole = {
    number : Nat8;
    name : Text;
    colour : Text;
    yardage : Nat;
    par : Nat8;
    strokeIndex : Nat8;
    images : [HoleImage];
  };

  public type HoleImage = {
    uploaded : Int;
    owner : Base.PrincipalId;
    image : Blob;
  };
  
};
