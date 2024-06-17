import T "../data-types/types";

module DTOs {
    public type CreateUserDTO = {
        username: Text;
        displayName: Text;
        profilePicture: Blob;
        profilePictureExtension: Text;
    };

    public type UpdateUserDTO = {
        username: Text;
        displayName: Text;
        profilePicture: Blob;
        profilePictureExtension: Text;
    };
    
    public type UserDTO = {

    };
}
