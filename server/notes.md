

Model 

productModel  --->> productController ---> productRoute ---> server.js
userModel     --->> userController  --->> userRoute - >> server.js 

Note - Follow the same syntax for other communcation as well.



Note - 
const token = createToken(user._id);
res.json({ success: true, token });

That token is the "key" that lets the user stay logged in and make authenticated requests without re-entering email/password every time