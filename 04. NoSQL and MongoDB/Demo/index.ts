import { mongoDemo } from "./mongoDemo";
import { mongooseDemo } from "./mongooseDemo";

try {
    // mongoDemo();
    mongooseDemo();
} catch (error) {
    console.error(error);
}