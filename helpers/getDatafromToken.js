import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

export const getDataFromToken = ( request=NextRequest) =>{
     try {
       const token = request.cookies.get('token')?.value || '';
        const decodedtoken = jwt.verify(token,process.env.tokensecret);
        return decodedtoken.id;
        
     } catch (error) {
        throw new Error(error.message)
     }
}