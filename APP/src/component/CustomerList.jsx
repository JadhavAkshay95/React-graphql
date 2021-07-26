import { useQuery } from "@apollo/client";
import { useState } from "react";
import AddSession from "./AddSession";
import Customer from "./Customer";
import { SESSIONS } from "./../GQL/query";

const CustomerList = () => {

    let [day, setDay] = useState("");
    day = day === "" ? "Wednesday" : day

    // useQuery hook
    const { loading, error, data } = useQuery(SESSIONS, {
        variables: { day }
    });



    return (
        <>

            <h1>Customer list</h1>
            {loading && <div>Loading.....</div>}
            {error && <div>Error.....</div>}
            <div>
                <AddSession  />
                <button onClick={() => setDay("Wednesday")}>Wed</button>
                <button onClick={() => setDay("Thursday")}>Thursday</button>
                <button onClick={() => setDay("Friday")}>Friday</button>
            </div>
            <div>
                {
                    data && data.sessions.map((session) => (
                        <>

                            <Customer key={session.id} item={session} />
                        </>
                    ))
                }
            </div>
        </>
    )
}

export default CustomerList;