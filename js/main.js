const PROFILE_IMAGE_CHANGE_TIME = 5000;

$(document).ready(function () {
  let pImageCounter = 1;
  setInterval(() => {
    $("#profile-image-wrapper").css(
      "background-image",
      "url(img/profile" + pImageCounter++ + ".jpg)"
    );
    if (pImageCounter >= 3) pImageCounter = 1;
  }, PROFILE_IMAGE_CHANGE_TIME);
});
