using System.Net;

namespace FixItNepal.Domain.Customs.Exceptions;

public class BusinessException:ApiException
{
 public BusinessException(string code, string message):base(code, message, (int)HttpStatusCode.BadRequest)
 {
  
 }   
}