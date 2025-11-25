export const authUser = async (req:any,res:any) =>{
    try {
        const user = req.user
        return res.status(200).json({user})
    } catch (error) {
        console.error("Error authUser:",error);
        return res.status(500).json("Internal server error")
    }
}