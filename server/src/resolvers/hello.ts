import { Query, Resolver } from "type-graphql";

@Resolver()
export class HelloResolver {
	@Query(() => String)
	public hello() {
		return "Hello, world!";
	}
}
