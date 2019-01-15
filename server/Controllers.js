const bcrypt = require('bcryptjs');
module.exports={

login: async (req, res)=> {
    let {username, password}= req.body
    const db= req.app.get('db');

    //  (req.body)
    //letting me use massive db
    let user= await db.find_user(username);
    
    if(user[0]){
         (user[0])
        // return res.status(200).send({loggedIn: false, message: 'Username not found.'})
        let result= bcrypt.compareSync(password, user[0].password)
        if(result){
        req.session.user = {
            username: user[0].username, 
            id: user[0].id
        }
        //  (req.session.user)
        res.status(200).send({loggedIn: true, message: 'Login Successful'})
        } else {
            res.send({message: 'login/pass incorrect'})
        }
    }
    
        

    //  (result)

    // if(result){
    //      (result)
    //     req.session.user={
    //         username: user[0].username, 
    //         id: user[0].id}
    //     return res.status(200).send({loggedIn: true, message:'Login Successful'})
    // }
    // else{
    //     return res.status(401).send({loggedIn: false, message: 'Incorrect Password'})
    // }
    
} ,

logout:(req, res)=> {
    req.session.destroy();
    res.redirect('/')
},


signup: async (req, res)=> {
    let {first_name, last_name, email, username, password, phone, lisc}= req.body;
    //  ('**WOW**', req.body);
    const db= req.app.get('db')
    let user= await db.find_user([username]);
    
    if(user[0]){
        return res.status(200).send({
            loggedIn: false,
            message: 'This username is already in use. Please choose a different one'
        })
    } 
    else {
        let salt= bcrypt.genSaltSync(10);
        //  ('**CONSOLE**')
        let hashValue= bcrypt.hashSync(password, salt)
        let createdUser= await db.make_user([first_name, last_name, email, username, hashValue, phone, lisc]);
        //  (createdUser);
        req.session.user={
            username: createdUser[0].username,
            id: createdUser[0].id
        }
        res.status(200).send({
            loggedIn: true,
            message: 'Login Successful'
        });
    };
},

addHouse: async (req, res)=> {
    let { price, cords, beds, bath, area_sqft, description, lat, lng}= req.body;
    //   ("***CONSOLE***", req.body.address)
    const db= req.app.get('db');
    let allHouses= await db.make_listing([ price, cords, beds, bath, area_sqft, description, lat, lng]);
    // let newHouse= await db.new_house_add([req.session.user.id, Number(newHouseId[0].id)])
    res.status(200).send(allHouses)
    //  (newHouse)
 
},


seeList:(req, res)=> {
    const db= req.app.get('db')
     (req.session)
    db.get_List([req.session.user.id])
    .then(listing=>{
        res.status(200).send(listing)
        //  (listing)
    })
},

realList: (req, res)=> {
    const db= req.app.get('db')
     (req.session)
    db.real_get_list([req.session.user.id])
    .then(listing => {
        res.status(200).send(listing)
    })
},

buyersFavts: async (req, res) => {
    let {users_id}= req.body
     ('**CONSOLE', req.session)
    const db= req.app.get('db');
    let favts= await db.find_listing_by_user([req.session.user.id]);
    //  (favts)
    res.status(200).send(favts)

},


removeListing: async (req, res)=> {
    //  ('***CONSOLE***', req.params.id)
    const db= req.app.get('db')
    let newList= await db.delete_list([req.params.id]);
    res.status(200).send(newList)
    
},

removeFl: async (req, res)=> {
    // let {id}= req.session.user
    const db= req.app.get('db')
     ('**SHOW THIS**',req.session.user.id, req.params.id)
    let newBl= await db.delete_favts([req.session.user.id, req.params.id]);
    res.sendStatus(200)
},

addFavts: async (req, res)=> {
     (req.body.post, req.session.user.id)
    const db= req.app.get('db')
    let addFavts= await db.add_favts([req.session.user.id, req.body.post])
    res.sendStatus(200)
},


updateListing: async(req, res)=> {
const db= req.app.get('db')
let {price, address, beds, bath, area_sqft, description}= req.body; // We will be receiving this data from the frontend for what to edit.
let updatedListingArray= await db.update_listing([req.params.id, address, beds, bath, area_sqft, price, description]);
res.status(200).send(updatedListingArray)
},

stateInputs: async (req, res) => {
    const db= req.app.get('db')
    let {id}= req.params;
    let rowToEdit= await db.get_listing_to_edit([id])
    //  (rowToEdit)
    res.status(200).send(rowToEdit[0])
},



//**********BUYERS SIDE OF LOGIN *********** */
buyersLogin: async(req, res)=> {
    let {username, password}= req.body;
    const db= req.app.get('db')
    
    let buyers= await db.find_user([username]);
    
    if(!buyers[0]){
        return res.status(200).send({loggedIn: false, message: 'Username Not Found.'})
    }
    
    let result= bcrypt.compareSync(password, buyers[0].password)
    if(result){
        req.session.user={username: buyers[0].username, id: buyers[0].id}
        return res.status(200).send({loggedIn: true, message: 'Login Successful'})
    } else {
        return res.status(401).send({loggedIn: false, message: 'Incorrect Username/Password'})
    }
},

buyersSignup: async(req, res)=> {
    let {first_name, last_name, email, username, password, phone, lisc}= req.body
    
    const db=req.app.get('db');
    let newBuyer= await db.find_user([username]);
    
    if(newBuyer[0]){
        return res.status(200).send({loggedIn: false, message: 'This username is already taken. Please try again'})
    }
    else {
        
        let salt= bcrypt.genSaltSync(10);
        //  ('**CONSOLE**', password, salt)
        let hashedValue= bcrypt.hashSync(password, salt)
        let createdBuyer= await db.make_user([first_name, last_name, email, username, hashedValue, phone, lisc]);
        req.session.user={
            username: createdBuyer[0].username,
            id: createdBuyer[0].id
        }
        res.status(200).send({
            loggedIn: false,
            message: 'Successfully Signed up. You may Login now'
        });
    };
},








}