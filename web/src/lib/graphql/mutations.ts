import { gql } from "@apollo/client";

export const MUTATION_EDIT_PROFILE = gql`
	mutation EditProfile($data: String!) {
		editProfile(data: $data)
	}
`;
