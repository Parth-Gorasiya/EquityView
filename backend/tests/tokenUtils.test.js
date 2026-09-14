const jwt = require("jsonwebtoken");

process.env.JWT_SECRET = "jwt-test-secret";
process.env.JWT_EXPIRES_IN = "1h";

const { createToken } = require("../utils/tokenUtils");

describe("JWT token utility", () => {
  test("creates a valid JWT containing the user ID", () => {
    const userId = "507f1f77bcf86cd799439011";

    const token = createToken(userId);

    expect(typeof token).toBe("string");

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    expect(decodedToken.userId).toBe(userId);
  });

  test("rejects the token when an incorrect secret is used", () => {
    const token = createToken(
      "507f1f77bcf86cd799439011"
    );

    expect(() => {
      jwt.verify(token, "incorrect-secret");
    }).toThrow();
  });
});