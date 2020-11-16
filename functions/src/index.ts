import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';

admin.initializeApp()

exports.createRoom = functions.firestore
.document('restaurants/{ID}')
.onCreate((obj, context) => {
    const docID = context.params.ID;
    const room = obj.data();
   
    axios({
      method: 'GET',
      url: 'https://api.yelp.com/v3/businesses/search?',
      params: {
        //parameters set from the room data
        latitude: room.location.lat,
        longitude: room.location.lng,
        radius: room.radius,
        categories: 'restaurants, All',
        limit: 30,
        //if they can't choose from 30 restaurants, i give up
              },
    headers:  {
    Authorization: "Bearer 
    })
    .then(response => {
        return admin.firestore().doc('restaurants/' +  docID).set({
          data: response.data,
          ready: true,
          start: false,
          done: false,
        }, { merge: true });
     })
    .catch(error => {
      //errors
    functions.logger.log(error);
    })
});


exports.roomUpdate = functions.firestore
    .document('restaurants/{ID}')
    .onUpdate((change, context) => {
       const docID = context.params.ID;
  const room = change.after.data();

  var variablename;
  var i;
  if (room.peopledone == room.users.length)
  { functions.logger.log(room.peopledone);
       functions.logger.log(room.users.length); 
   var max = 0;
    var index = 0;
    for (i = 0; i < room.data.businesses.length; i++)
 {    variablename = "groupScore" + i;
      
     if (max < room[variablename])
     {
       max = room[variablename];
       index = i;
     }
 }
 return admin.firestore().doc('restaurants/' +  docID).set({
done: true,
recommended: room.data.businesses[index]
}, { merge: true });

  }
  //will have some unncessary loops but works
  // if variable = max, set it to done, else return max
 for (i = 0; i < room.data.businesses.length; i++)
 {    variablename = "groupScore" + i;

     if (room.users.length == room[variablename])
     {
       functions.logger.log(variablename);
       functions.logger.log(room.users.length);
       return admin.firestore().doc('restaurants/' +  docID).set({
done: true,
recommended: room.data.businesses[i]
}, { merge: true });
     }
 }
return 
    


  });

exports.createRoomPlaces = functions.firestore
    .document('places/{ID}')
    .onCreate((obj, context) => {
       const docID = context.params.ID;
  const room = obj.data();
 
 axios({
      method: 'GET',
      url: 'https://api.yelp.com/v3/businesses/search?',
      params: {
        //parameters set from the room data
         latitude: room.location.lat,
         longitude: room.location.lng,
         radius: room.radius,
         categories: 'active, All',
         limit: 30,
      },
      headers:  {
        Authorization: ""
      },
    })
      .then(response => {
            
            


             return admin.firestore().doc('places/' +  docID).set({
  data: response.data,
  ready: true,
  start: false,
  done: false,
}, { merge: true });


                   
        })
        .catch(error => {
          
           functions.logger.log(error);
        })

    


  });

exports.roomUpdatePlaces = functions.firestore
    .document('places/{ID}')
    .onUpdate((change, context) => {
       const docID = context.params.ID;
  const room = change.after.data();

  var variablename;
  var i;
  if (room.peopledone == room.users.length)
  { functions.logger.log(room.peopledone);
       functions.logger.log(room.users.length); 
   var max = 0;
    var index = 0;
    for (i = 0; i < room.data.businesses.length; i++)
 {    variablename = "groupScore" + i;
      
     if (max < room[variablename])
     {
       max = room[variablename];
       index = i;
     }
 }
 return admin.firestore().doc('places/' +  docID).set({
done: true,
recommended: room.data.businesses[index]
}, { merge: true });

  }
  //will have some unncessary loops but works
  // if variable = max, set it to done, else return max
 for (i = 0; i < room.data.businesses.length; i++)
 {    variablename = "groupScore" + i;

     if (room.users.length == room[variablename])
     {
       functions.logger.log(variablename);
       functions.logger.log(room.users.length);
       return admin.firestore().doc('places/' +  docID).set({
done: true,
recommended: room.data.businesses[i]
}, { merge: true });
     }
 }
return 
    


  });
   exports.createRoomTravel = functions.firestore
    .document('travel/{ID}')
    .onCreate((obj, context) => {
       const docID = context.params.ID;
  const room = obj.data();
  functions.logger.log(room);
 axios({
      method: 'GET',
      url: 'https://api.yelp.com/v3/businesses/search?',
      params: {
        //parameters set from the room data
         latitude: room.location.lat,
         longitude: room.location.lng,
         radius: room.radius,
         categories: 'hotelstravel, All',
         limit: 30,
      },
      headers:  {
        Authorization: ""
      },
    })
      .then(response => {
            
            


             return admin.firestore().doc('travel/' +  docID).set({
  data: response.data,
  ready: true,
  start: false,
  done: false,
}, { merge: true });


                   
        })
        .catch(error => {
          
           functions.logger.log(error);
        })

    


  });

exports.roomUpdateTravel = functions.firestore
    .document('travel/{ID}')
    .onUpdate((change, context) => {
       const docID = context.params.ID;
  const room = change.after.data();

  var variablename;
  var i;
  if (room.peopledone == room.users.length)
  { functions.logger.log(room.peopledone);
       functions.logger.log(room.users.length); 
   var max = 0;
    var index = 0;
    for (i = 0; i < room.data.businesses.length; i++)
 {    variablename = "groupScore" + i;
      
     if (max < room[variablename])
     {
       max = room[variablename];
       index = i;
     }
 }
 return admin.firestore().doc('travel/' +  docID).set({
done: true,
recommended: room.data.businesses[index]
}, { merge: true });

  }
  //will have some unncessary loops but works
  // if variable = max, set it to done, else return max
 for (i = 0; i < room.data.businesses.length; i++)
 {    variablename = "groupScore" + i;

     if (room.users.length == room[variablename])
     {
       functions.logger.log(variablename);
       functions.logger.log(room.users.length);
       return admin.firestore().doc('travel/' +  docID).set({
done: true,
recommended: room.data.businesses[i]
}, { merge: true });
     }
 }
return 
    


  });
    exports.createRoomMovies = functions.firestore
    .document('movies/{ID}')
    .onCreate((obj, context) => {
       const docID = context.params.ID;





 axios({
      method: 'GET',
  url: 'https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi',
  params: {
    q: ' -!1900,2021-!0,5-!0,10-!'+obj.data().code+'-!Any-!Any-!Any-!gt100-!{downloadable}',
    t: 'ns',
    cl: 'all',
    st: 'adv',
    ob: 'Relevance',
    p: '1',
    sa: 'and'
  },
  headers: {
    
  },
    })
      .then(response => {
            
            


             return admin.firestore().doc('movies/' +  docID).set({
  data: response.data,
  ready: true,
  start: false,
  done: false,
}, { merge: true });


                   
        })
        .catch(error => {
          
           functions.logger.log(error);
        })

    


  });

exports.roomUpdateMovies = functions.firestore
    .document('movies/{ID}')
    .onUpdate((change, context) => {
       const docID = context.params.ID;
  const room = change.after.data();

  var variablename;
  var i;
  if (room.peopledone == room.users.length)
  { functions.logger.log(room.peopledone);
       functions.logger.log(room.users.length); 
   var max = 0;
    var index = 0;
    for (i = 0; i < room.data.ITEMS.length; i++)
 {    variablename = "groupScore" + i;
      
     if (max < room[variablename])
     {
       max = room[variablename];
       index = i;
     }
 }
 return admin.firestore().doc('movies/' +  docID).set({
done: true,
recommended: room.data.ITEMS[index]
}, { merge: true });

  }
  //will have some unncessary loops but works
  // if variable = max, set it to done, else return max
 for (i = 0; i < room.data.ITEMS.length; i++)
 {    variablename = "groupScore" + i;

     if (room.users.length == room[variablename])
     {
       functions.logger.log(variablename);
       functions.logger.log(room.users.length);
       return admin.firestore().doc('movies/' +  docID).set({
done: true,
recommended: room.data.ITEMS[i]
}, { merge: true });
     }
 }
return 
    


  });
   
   
   
   

