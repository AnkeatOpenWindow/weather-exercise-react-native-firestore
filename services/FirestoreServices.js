import { addDoc, collection, doc, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";

export const addReading = async (dayId, readingData) => {

    try {
        // Add reading to specific day
        // 1. spesofy where we want the data
        const dayRef = doc(db, "days", dayId) // spesific doc's ID


        //2. spesifuy the subcollection in this doc
        const readingRef = collection(dayRef, "readings")

        // 3. add document into this subcollection that we have
        const docRef = await addDoc(readingRef, readingData)

        console.log("Sucsess adding doc with id: " + docRef.id)

        return true //success
    } catch (error) {
        console.log("Something went wrong adding reading document: " + e)
        return false //failed
    }

}






export const getAllDays = async () => {

    try {
        // return the days that we want to read

        // 1. spesifiy where we want to get the data
        const collectionRef = collection(db, "days");

        //bonus: order by a field in my documents (TODO: try fixing later)
        //const q = query(collection, orderBy("dayOfWeek", "asc"))

        // 2. spesify with what we want to do with this collection
        const querySnapshot = await getDocs(collection(db, "days"));

        // .3 process my data to be managble
        var daysData = []

        // lopp through each document
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data()); //<-- shows the names in the console

            var theDay = { ...doc.data(), id: doc.id }
            daysData.push(theDay)
        });
        return daysData

    } catch (error) { //<-- catching the break of our app, so that it doesn't happen
        console.log("Somthing went wrong getting out days" + e)
        return []
    }

}