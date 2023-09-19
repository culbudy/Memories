import jwt from "jsonwebtoken";

const secret = 'test';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);
      // console.log(decodedData);

      req.userId = decodedData?.id;
    } else {
      // console.log("Middleware "+token);
      // decodedData = jwt.decode(token);
      
      // console.log(res.userId);
      req.userId = token?.sub;
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;