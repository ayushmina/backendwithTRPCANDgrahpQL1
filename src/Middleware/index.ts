import { checkAuthorizationBYToken } from "./authMiddleware/checkAuth";
import { graphqlMiddleware,checkAuthenticated } from "./graph_QL/graphqlMiddleware";
import { multiTenantMiddleware } from "./multiTenant/multiTenant";
import { prometheusMiddleware } from "./PrometheusMiddleware";

let middleware={
    checkAuthenticatedGraphql:checkAuthenticated,
    graphqlMiddleware,
    multiTenantMiddleware,
    checkAuthorizationBYToken,
    prometheusMiddleware
}
export default middleware;