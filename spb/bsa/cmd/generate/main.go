package generate

import (
	_ "embed"
	"fmt"
	"log"
	"os"
	"text/template"
)

type entity struct {
	ModuleName string
	Path       string
}

func GenerateNewModule() {
	if len(os.Args) <= 1 {
		fmt.Println("error: missing arg[2], try go run gen.go user")
		return
	}

	newModule := getNewModuleStruct(os.Args[2])

	fmt.Printf("newModule %+v\n", newModule)

	/* create tries */
	if err := os.Mkdir(newModule.Path, 0o755); err != nil {
		fmt.Println("err:", err)
	}
	if err := os.Mkdir(newModule.Path+"/handler", 0o755); err != nil {
		fmt.Println("err:", err)
	}
	if err := os.Mkdir(newModule.Path+"/model", 0o755); err != nil {
		fmt.Println("err:", err)
	}
	if err := os.Mkdir(newModule.Path+"/service", 0o755); err != nil {
		fmt.Println("err:", err)
	}

	fmt.Printf("created %s\n\n", newModule.Path)
	newModule.createFile(handlerTemplate, newModule.Path+"/handler/handler.go")
	newModule.createFile(modelTemplate, newModule.Path+"/model/model.go")
	newModule.createFile(serviceTemplate, newModule.Path+"/service/service.go")
	newModule.createFile(routeTemplate, newModule.Path+"/route.go")
}

func getNewModuleStruct(inputName string) *entity {
	newDirectory := fmt.Sprintf("internal/%s", inputName)
	newModule := &entity{inputName, newDirectory}
	return newModule
}

func (e *entity) createFile(templateFile, filePath string) {
	file, err := os.Create(filePath)
	if err != nil {
		log.Printf("create %s failed: %s\n", filePath, err)
		return
	}

	t := template.Must(template.New(filePath).Parse(templateFile))
	t.Execute(file, e)
}

//go:embed skel/route.tmpl
var routeTemplate string

//go:embed skel/handler.tmpl
var handlerTemplate string

//go:embed skel/service.tmpl
var serviceTemplate string

//go:embed skel/model.tmpl
var modelTemplate string
