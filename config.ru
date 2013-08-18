#\ -w -p 8080

use Rack::Static,
    :urls => ["/css", "fonts", "/js", "/lib", "/partials"],
    :root => "."

run lambda { |env|
  [
      200,
      {
          'Content-Type'  => 'text/html',
          'Cache-Control' => 'public, max-age=86400'
      },
      File.open('index.html', File::RDONLY)
  ]
}