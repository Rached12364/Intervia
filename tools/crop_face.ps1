Add-Type -AssemblyName System.Drawing
$encoder = [System.Drawing.Imaging.ImageFormat]::Jpeg
$src = [System.Drawing.Image]::FromFile('c:\Users\rache\intervia\src\assets\livre\case-4.jpg')

# Mohamed's head is located in case-4 around x=40..160, y=5..125
$cropRect = New-Object System.Drawing.Rectangle(40, 5, 115, 115)
$bmp = New-Object System.Drawing.Bitmap(350, 350)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.DrawImage($src, (New-Object System.Drawing.Rectangle(0, 0, 350, 350)), $cropRect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

$bmp.Save('c:\Users\rache\intervia\src\assets\livre\case-4-visage.jpg', $encoder)
$bmp.Dispose()
$src.Dispose()
Write-Output 'Created case-4-visage.jpg'
