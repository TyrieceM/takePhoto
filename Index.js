function doClick(e) {
    alert($.label.text);
}
$.index.open();

var Cloud = require('ti.cloud');

Cloud.Users.login({
    login: 'tyriecem@icloud.com',
    password: 'tyriece1128'
}, function (e) {
    if (e.success) {
        var user = e.users[0];
        alert('Success:\n' +
            'id: ' + user.id + '\n' +
            'sessionId: ' + Cloud.sessionId + '\n' +
            'first name: ' + user.first_name + '\n' +
            'last name: ' + user.last_name);
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});

// If not authorized, get authorization from the user
if(!social.isAuthorized()) {
    social.authorize();
}

// Post a message
 // Setup both callbacks for confirmation
 // Note: share() automatically calls authorize() so an explicit call as above is unnecessary
social.share({
    message: "Salut, Monde!",
    success: function(e) {alert('Success!');},
    error: function(e) {alert('Error!');}
});

// Deauthorize the application
social.deauthorize();

Titanium.Media.showCamera({
	success:function(event) {
 // called when media returned from the camera
		Ti.API.debug('Our type was: '+event.mediaType);
 if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
			var imageView = Ti.UI.createImageView({
				width:win.width,
				height:win.height,
				image:event.media
			});
			win.add(imageView);
		} else {
			alert("got the wrong type back ="+event.mediaType);
		}
	},
	cancel:function() {
 // called when user cancels taking a picture
	},
	error:function(error) {
 // called when there's an error
		var a = Titanium.UI.createAlertDialog({title:'Camera'});
 if (error.code == Titanium.Media.NO_CAMERA) {
			a.setMessage('Please run this test on device');
		} else {
			a.setMessage('Unexpected error: ' + error.code);
		}
		a.show();
	},
	saveToPhotoGallery:true,
 // allowEditing and mediaTypes are iOS-only settings
	allowEditing:true,
	mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO,Ti.Media.MEDIA_TYPE_PHOTO]
});
