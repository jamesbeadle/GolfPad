export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store",".ic-assets.json",".well-known/ic-domains",".well-known/ii-alternative-origins","MonaSans-Regular.woff2","MonaSans-SemiBold.woff2","MonaSansCondensed-ExtraBold.woff2","MonaSansCondensed-Regular.woff2","bands-game.png","bands.png","boat.png","build-it-game.png","build-it.png","favicons/apple-touch-icon.png","favicons/browserconfig.xml","favicons/favicon-16x16.png","favicons/favicon-32x32.png","favicons/favicon.ico","favicons/icon-192x192.png","favicons/icon-512x512.png","favicons/mstile-150x150.png","favicons/safari-pinned-tab.svg","golfCourse.png","golfball.png","golfball_mobile.png","handicap.png","manifest.webmanifest","meta-share.jpg","mulligans-game.png","mulligans.png","next-up-game.png","next-up.png","panel-bg.png","placeholder.png","prophet.png","roadmap.png","team/ashutosh.jpg","team/dfd.jpg","team/george.jpg","team/james.jpg","team/josh.jpg","team/kelly.jpeg","team/thilly.jpg","team/zoe.jpg","token.png"]),
	mimeTypes: {".json":"application/json",".woff2":"font/woff2",".png":"image/png",".xml":"text/xml",".svg":"image/svg+xml",".webmanifest":"application/manifest+json",".jpg":"image/jpeg",".jpeg":"image/jpeg"},
	_: {
		client: {"start":"_app/immutable/entry/start.CWXn2sLy.js","app":"_app/immutable/entry/app.08VQZ1lZ.js","imports":["_app/immutable/entry/start.CWXn2sLy.js","_app/immutable/chunks/index.prmv6z2R.js","_app/immutable/chunks/vendor.C00-OxwN.js","_app/immutable/entry/app.08VQZ1lZ.js","_app/immutable/chunks/index.prmv6z2R.js","_app/immutable/chunks/vendor.C00-OxwN.js"],"stylesheets":["_app/immutable/assets/index.D3YEpmre.css","_app/immutable/assets/index.D3YEpmre.css"],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/game-rules",
				pattern: /^\/game-rules\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/games",
				pattern: /^\/games\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/games/create/[game]",
				pattern: /^\/games\/create\/([^/]+?)\/?$/,
				params: [{"name":"game","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/games/[gameId]",
				pattern: /^\/games\/([^/]+?)\/?$/,
				params: [{"name":"gameId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/profile",
				pattern: /^\/profile\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/team",
				pattern: /^\/team\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/whitepaper",
				pattern: /^\/whitepaper\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
