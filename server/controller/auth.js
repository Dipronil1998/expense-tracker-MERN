
exports.auth = async (req, res, next)=>{
    try {
        const code = req.body.code;

        if (code == process.env.secretCode) {
          res.status(200).json({ success: true, message: 'Authentication successful' });
        } else {
          res.status(401).json({ success: false, message: 'Invalid code' });
        }
    } catch (error) {
        next(error)
    }
}