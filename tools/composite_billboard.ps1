Add-Type -AssemblyName System.Drawing

$case6Path = "c:\Users\rache\intervia\src\assets\livre\case-6.jpg"
$bmp = [System.Drawing.Bitmap]::FromFile($case6Path)

# 1. First, let's sample the background gradient at the circle area to fill and clean the white outline
# The billboard inner area is roughly x=80..195, y=38..162
# Let's paint a smooth gradient or solid deep blue/violet over the circle area
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

# Center is (136.5, 99.5)
# Draw an opaque or clean gradient fill over the white ring:
$brushColor = [System.Drawing.Color]::FromArgb(255, 20, 35, 78) # Deep navy matching the top
$brushColorBottom = [System.Drawing.Color]::FromArgb(255, 65, 40, 110) # Violet matching the bottom

$fillArea = New-Object System.Drawing.Rectangle(78, 38, 118, 124)
$linBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($fillArea, $brushColor, $brushColorBottom, [System.Drawing.Drawing2D.LinearGradientMode]::Vertical)
$g.FillEllipse($linBrush, 80, 40, 113, 120)
$linBrush.Dispose()

# Now draw the full IntervIA logo or symbol centered on the billboard:
# The billboard width is from x=75 to x=198 (width 123). Billboard height is from y=32 to y=200 (height 168).
# Let's load the symbol logo
$logoPath = "c:\Users\rache\intervia\src\assets\logo-symbol.png"
$logo = [System.Drawing.Bitmap]::FromFile($logoPath)

# Diameter 104px, centered at (136.5, 99.5) -> top-left at (84, 47)
$logoRect = New-Object System.Drawing.Rectangle(84, 47, 105, 105)

# Draw an elegant soft white outer rim for the billboard advertising effect
$pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(220, 255, 255, 255), 2.5)
$g.DrawEllipse($pen, 83, 46, 107, 107)
$pen.Dispose()

$g.DrawImage($logo, $logoRect)

# Let's also add the subtle "intervIA" brand text under the emblem on the poster!
$font = New-Object System.Drawing.Font("Arial", 11, [System.Drawing.FontStyle]::Bold)
$textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$stringFormat = New-Object System.Drawing.StringFormat
$stringFormat.Alignment = [System.Drawing.StringAlignment]::Center
$g.DrawString("intervIA", $font, $textBrush, 136.5, 160, $stringFormat)

$font.Dispose()
$textBrush.Dispose()
$stringFormat.Dispose()

$g.Dispose()
$logo.Dispose()

$encoder = [System.Drawing.Imaging.ImageFormat]::Jpeg
$bmp.Save("c:\Users\rache\intervia\src\assets\livre\case-6.jpg", $encoder)
$bmp.Dispose()

Write-Output "Successfully updated case-6.jpg with centered IntervIA billboard advertisement"
