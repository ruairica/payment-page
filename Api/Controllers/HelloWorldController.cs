using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Stripe;
using System;
using Stripe.Checkout;
using System.Collections.Generic;

namespace Api.Controllers    
{
    public class HelloWorldController
    {

        public string x { get; set; }

        public HelloWorldController()
        {
            StripeConfiguration.ApiKey = Environment.GetEnvironmentVariable("StripeSecretKey");
            this.x = Environment.GetEnvironmentVariable("StripeSecretKey");
        }

        [FunctionName("HelloWorldFunction")]
        public async Task<IActionResult> HelloWorldFunction(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "HelloWorld")] HttpRequest req)
        {
            return new OkObjectResult(true);
        }

        [FunctionName("CreateCheckoutSession")]
        public async Task<IActionResult> PaymentSecret(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = "PaymentSecret")] HttpRequest req)
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = 500,
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
