import { gql } from "@apollo/client";

// Fragment
const sessionData = gql`
 fragment sessionField on Session {
    id
    title
 }
`;

// Query, added variable
export const SESSIONS = gql`
query sessionList($day:String !) {
    sessions(day: $day) {
       ...sessionField
    }
}
${sessionData}
`;

// Mutation to create query
export const createMutation = gql`
    mutation createSession($session: SessionInput!) {
        createSession(session: $session) {
            id,
            title
        }
    }
 `;