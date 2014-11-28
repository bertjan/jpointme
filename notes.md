This SHOULD be the flow for authorizing with github:


1. Redirect to this url:
https://github.com/login/oauth/authorize?scope=user:email&client_id=1bc92a94284e847ee611

2. After logging in will be redirected to:
http://j.point.me?code= <code>

3. Then post to: (get also works)
https://github.com/login/oauth/access_token?client_id=1bc92a94284e847ee611&client_secret=e274eb7a8c1b1ba436c609a155c52b99b960f3f1&code= <code>

retrieve access token..

4. Get user info ??
https://api.github.com/user?access_token= <token>

.test. remove this line
