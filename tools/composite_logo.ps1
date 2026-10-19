Add-Type -AssemblyName System.Drawing

$case6Path = "c:\Users\rache\intervia\src\assets\livre\case-6.jpg"
$logoPath = "c:\Users\rache\intervia\src\assets\logo-symbol.png"

$bmp = [System.Drawing.Bitmap]::FromFile($case6Path)
$logo = [System.Drawing.Bitmap]::FromFile($logoPath)

$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

# Circle bounds were: X=[84, 189], Y=[40, 159], Center=(136.5, 99.5), Diameter=105
# Let's fit the logo symbol inside the white circle:
# Leave a small margin (e.g. diameter 98px or 100px) so the white circular frame acts as a halo
$targetSize = 98
$posX = [int](136.5 - ($targetSize / 2))
$posY = [int](99.5 - ($targetSize / 2))

$destRect = New-Object System.Drawing.Rectangle($posX, $posY, $targetSize, $targetSize)
$g.DrawImage($logo, $destRect)

$g.Dispose()
$logo.Dispose()

# Save with high quality JPEG
$encoder = [System.Drawing.Imaging.ImageFormat]::Jpeg
$bmp.Save("c:\Users\rache\intervia\src\assets\livre\case-6-logo.jpg", $encoder)
$bmp.Dispose()

Write-Output "Successfully generated case-6-logo.jpg at position ($posX, $posY) size ${targetSize}x${targetSize}"
