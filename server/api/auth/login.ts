import PocketBase from "pocketbase";

export default defineEventHandler(async (event) => {
  const pb = new PocketBase('http://127.0.0.1:8090');
  const runtimeConfig = useRuntimeConfig();
  const body = await readBody(event);
  const authData = await pb.collection('users').authWithPassword(body.username, body.password)
});
