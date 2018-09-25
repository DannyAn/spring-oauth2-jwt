package com.estudo.authserver.configuration.oauth;

import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class AdditionalDataEnchancer implements TokenEnhancer {
    @Override
    public OAuth2AccessToken enhance(OAuth2AccessToken oAuth2AccessToken, OAuth2Authentication oAuth2Authentication) {

        Map<String, Object> additionalInfo = new HashMap<>();

        ResourceOwner user = (ResourceOwner) oAuth2Authentication.getPrincipal();

        additionalInfo.put("user_id", user.getUsuario().getId());
        additionalInfo.put("user_login", user.getUsername());
        additionalInfo.put("user_name", user.getUsuario().getNome());

        DefaultOAuth2AccessToken defaultOAuth2AccessToken = (DefaultOAuth2AccessToken) oAuth2AccessToken;

        defaultOAuth2AccessToken.setAdditionalInformation(additionalInfo);

        return defaultOAuth2AccessToken;
    }
}
