const PROFILE_IMAGE_CHANGE_TIME = 5000;
const MAX_PROFILE_PICS = 2;
$(document).ready(function () {
  let pImageCounter = 1;

  function changeProfilePic() {
    $("#profile-image-wrapper").css(
        "background-image",
        "url(img/profile" + pImageCounter++ + ".jpg)"
    );
    if (pImageCounter > MAX_PROFILE_PICS) pImageCounter = 1;
  }
  setInterval(changeProfilePic, PROFILE_IMAGE_CHANGE_TIME);

});
