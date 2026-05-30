export async function apiHandler(
  fn: () => Promise<Response>
) {
  try {
    return await fn();
  } catch (error) {
    console.error("API ERROR:", error);

    return Response.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}