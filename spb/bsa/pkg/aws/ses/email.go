package ses

type EmailInfo struct {
	ID      string
	From    string
	To      []string
	Cc      []string
	Bcc     []string
	Title   string
	Charset string
	Message string
}
