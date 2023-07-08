using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using Vezeeta.Auth;
using Vezeeta.IEntities;
using Microsoft.Extensions.Configuration;

namespace Vezeeta.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        #region Fields
        readonly IJWT _jwt;
        readonly IAuthentication<Admin> _authentication;
        #endregion

        #region Constructor
        public AuthController(IJWT jWT, IAuthentication<Admin> authentication)//Iauth of doctor&patient
        {
            _jwt = jWT;
            _authentication = authentication;
        }
        #endregion

        #region Methods
        [HttpPost("admin")]
        public async Task<ActionResult> Login(LogInDTO login)
        {


            #region Check Parameters 
            var EmptyParametersObj = new
            {
                StatusCode = 400,
                message = "Empty Parameters",
            };
            if (login.email == null || login.password == null) return BadRequest(EmptyParametersObj);
            #endregion

            Admin? admin = await _authentication.Login(login);

            #region Check is Existed
            var InvalidCredentialObj = new
            {
                StatusCode = 400,
                message = "Invalid Credential",
            };

            if (admin == null)
                return BadRequest(InvalidCredentialObj);
            #endregion

            #region Define Claims
            List<Claim> claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                new Claim(type: "name", value: admin.email),
                new Claim(ClaimTypes.Role , "Admin")
            };
            #endregion

            #region Response Formatter
            var response = new
            {

                StatusCode = 200,
                message = "Login successful",
                response = new
                {
                    token = _jwt.GenerateToken(claims),
                    role = "Admin",
                    admin = new
                    {
                        email = admin.email,
                    }
                }

            };
            #endregion

            return Ok(response);
        }

        #endregion
    }
}
