import { useMutation } from "@apollo/client";
import { useState } from "react";
import { createMutation, SESSIONS } from "./../GQL/query";

const AddSession = () => {
    const [session, setSession] = useState({
        title: "",
        description: "",
        day: "",
        level: ""
    });


    /**
     * Update cache after mutation
     * @param {*} cache 
     * @param {*} param1 
     */
    const updateSessions = (cache, { data }) => {
        cache.modify(
            {
                fields: {
                    sessions(existingSessions = []) {
                        const newSession = data.createSession;
                        cache.writeQuery(
                            {
                                query: SESSIONS,
                                data: { newSession, ...existingSessions }
                            }
                        )
                    }
                }
            }
        )
    }

    /**
     * Use mutation hook
     */
    const [mutation, { called, error }] = useMutation(createMutation,
        { update: updateSessions })

    const changeHandler = ($event) => {
        const { target: { name, value } } = $event;
        setSession(prev => {
            return (
                {
                    ...session,
                    [name]: value
                }
            )
        })
    }

    const submitHandler = async ($event) => {
        $event.preventDefault();
        await mutation({ variables: { session: session } });
    }

    if (called) return <div>Added</div>
    if (error) return <div>error</div>

    return (
        <>
            <h1>Add new Session</h1>

            <div>
                <form onSubmit={submitHandler}>
                    <div>
                        <label>title</label>
                        <input type="text" value={session.title} name="title" onChange={changeHandler} />
                    </div>
                    <div>
                        <label>description</label>
                        <input type="text" value={session.description} name="description" onChange={changeHandler} />
                    </div>
                    <div>
                        <label>format</label>
                        <input type="text" value={session.day} name="day" onChange={changeHandler} />
                    </div>
                    <div>
                        <label>level</label>
                        <input type="text" value={session.level} name="level" onChange={changeHandler} />
                    </div>
                    <button type="submit" >Submit</button>
                </form>
            </div>
        </>
    )
}

export default AddSession;