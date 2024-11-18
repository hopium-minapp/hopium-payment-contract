import { Config } from "../config";

export const Jettons = {
    DEFAULT: {
        type: 100000,
        address: Config.OWNER_ADDRESS,
    },
    DOGS: {
        type: 2,
        address: "kQDl14w1cyU3liWkBOvJYJqXXiULnV9Ng1eWormFsFaz3RSw",
    },
    CATS: {
        type: 3,
        address: "kQDl14w1cyU3liWkBOvJYJqXXiULnV9Ng1eWormFsFaz3RSw",
    },
} as const;

