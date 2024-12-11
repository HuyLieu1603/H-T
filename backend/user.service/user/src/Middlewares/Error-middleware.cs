using System.Net;
using Newtonsoft.Json;

public class ErrorHandlingMiddleware
{
	private readonly RequestDelegate next;
	private readonly ILogger<ErrorHandlingMiddleware> logger;

	public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
	{
		this.next = next;
		this.logger = logger;
	}

	public async Task InvokeAsync(HttpContext httpContext)
	{
		try
		{
			await next(httpContext);
		}
		catch (Exception ex)
		{
			logger.LogError(ex, "");
			await HandleExceptionAsync(httpContext, ex);
		}
	}
	public Task HandleExceptionAsync(HttpContext context, Exception exception)
	{
		var StatusCode = HttpStatusCode.InternalServerError;
		var Message = "Server bị lỗi!";

		string detail = exception.Message;

		if (exception is ArgumentException)
		{
			StatusCode = HttpStatusCode.BadRequest;
			Message = "Lỗi nhập liệu!";
		}
		else if (exception is UnauthorizedAccessException)
		{
			StatusCode = HttpStatusCode.Unauthorized;
			Message = "Không có quyền truy cập!";
		}
		else if (exception is InvalidOperationException)
		{
			StatusCode = HttpStatusCode.BadRequest;
			Message = "Yêu cầu không hợp lệ";
		}
		var ErrorResponse = new ErrorResponse((int)StatusCode, Message, detail);
		context.Response.ContentType = "application/json";
		context.Response.StatusCode = (int)StatusCode;

		return context.Response.WriteAsync(JsonConvert.SerializeObject(ErrorResponse));
	}
}