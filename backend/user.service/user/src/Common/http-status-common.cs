public class ErrorResponse
{
	public int StatusCode { get; set; }
	public string Message { get; set; }
	public string Detail { get; set; }
	public ErrorResponse(int StatusCode, string Message, string Detail)
	{
		this.StatusCode = StatusCode;
		this.Message = Message;
		this.Detail = Detail;
	}
}