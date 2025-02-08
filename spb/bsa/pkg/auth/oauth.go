package auth

import (
	"context"

	"spb/bsa/pkg/config"

	"golang.org/x/oauth2"
)

type OAuth2 interface {
	Exchange(ctx context.Context, code string) (*oauth2.Token, error)
}

type OAuth2Google struct {
	OAuth2
	GoogleProvider *oauth2.Config
}

func (o *OAuth2Google) Exchange(ctx context.Context, code string) (*oauth2.Token, error) {
	return o.GoogleProvider.Exchange(ctx, code)
}

func NewOAuth2Google(config *config.Config) OAuth2 {
	return &OAuth2Google{
		GoogleProvider: &oauth2.Config{
			ClientID:     config.OAuth.Google.ClientID,
			ClientSecret: config.OAuth.Google.ClientSecret,
			RedirectURL:  config.OAuth.Google.Callback,
		},
	}
}
