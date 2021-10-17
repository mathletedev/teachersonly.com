import { gql } from "@apollo/client";

export const QUERY_ME_ID = gql`
	query MeId {
		me {
			_id
		}
	}
`;

export const QUERY_ME_USERNAME = gql`
	query MeUsername {
		me {
			username
		}
	}
`;
