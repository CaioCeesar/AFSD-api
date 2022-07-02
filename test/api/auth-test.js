import { assert } from "chai";
import { travelShareService } from "./travelshare-service.js";
import { decodeToken } from "../../src/jwt-utils.js";
import { testUser, testUserCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    travelShareService.clearAuth();
    await travelShareService.createUser(testUser);
    await travelShareService.authenticate(testUserCredentials);
    await travelShareService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await travelShareService.createUser(testUser);
    const response = await travelShareService.authenticate(testUser);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await travelShareService.createUser(testUser);
    const response = await travelShareService.authenticate(testUser);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    travelShareService.clearAuth();
    try {
      await travelShareService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});
