import { gql } from "@apollo/client";

export const MUTATION_EDIT_USER = gql`
	mutation EditUser($data: String!) {
		editUser(data: $data)
	}
`;
