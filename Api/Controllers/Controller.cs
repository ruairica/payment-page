using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Stripe;
using System;

namespace Api.Controllers    
{
    public class Controller
    {
        public Controller()
        {
            StripeConfiguration.ApiKey = Environment.GetEnvironmentVariable("StripeSecretKey");
        }

        [FunctionName("PaymentIntent")]
        public async Task<IActionResult> PaymentIntent(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = "PaymentIntent")] HttpRequest req)
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = 500, // £5
                Currency = "gbp",
                AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
                {
                    Enabled = true,
                },
            };
            var service = new PaymentIntentService();
            var paymentIntent = service.Create(options);


            return new OkObjectResult(new { client_secret = paymentIntent.ClientSecret });

        }
    }
}
