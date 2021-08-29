const jwt = require('jsonwebtoken')

const validateToken = (req, res, next) => {
    const authorizationHeader = req.headers.authorization
    let result

    if (authorizationHeader) {
        const token = req.headers.authorization.split(' ')[1] // Bearer <token>
        const secret = process.env.ACCESS_TOKEN_SECRET

        try {
            // verify makes sure that the token hasn't expired and has been issued by us
            result = jwt.verify(token, secret)

            if (result['role'] != 'DeliveryPerson'){
                result = {
                    error: `Unauthorized Access`,
                    status: 401
                }
                return res.status(401).send(result)
            }
                

            
            // Let's pass back the decoded token to the request object
            req.decoded = result
            console.log(result);
            // We call next to pass execution to the subsequent middleware
            next()
        } catch (err) {
            // Throw an error just in case anything goes wrong with verification
            res.status(401).send(result)
            // throw new Error(err)
        }
    } else {
        result = {
            error: `Authentication error. Token required.`,
            status: 401
        }
        return res.status(401).send(result)
    }
}

module.exports = validateToken