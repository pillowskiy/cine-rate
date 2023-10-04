import {notFound} from "next/navigation";

/*
 * TEMP ? dynamic catch all not found routes
 * https://stackoverflow.com/questions/75302340/
 */
export default function NotFoundCatchAll() {
  notFound()
}