Add-Type -AssemblyName System.Drawing

$srcFile = "c:\Users\rache\intervia\src\assets\livre\case-6.jpg"
$destFile = "c:\Users\rache\intervia\src\assets\livre\case-6-pub.jpg"
$logoFile = "c:\Users\rache\intervia\src\assets\logo-symbol.png"

# Read bytes to avoid file lock
$bytes = [System.IO.File]::ReadAllBytes($srcFile)
$ms = New-Object System.IO.MemoryStream(,$bytes)
$srcBmp = [System.Drawing.Bitmap]::FromStream($ms)
$bmp = New-Object System.Drawing.Bitmap($srcBmp.Width, $srcBmp.Height)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.DrawImage($srcBmp, 0, 0, $srcBmp.Width, $srcBmp.Height)
$srcBmp.Dispose()
$ms.Dispose()

$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

# 1. Soft gradient mask to erase the empty white circle outline
$brushTop = [System.Drawing.Color]::FromArgb(255, 14, 43, 99)   # Navy #0E2B63
$brushBottom = [System.Drawing.Color]::FromArgb(255, 83, 53, 143) # Violet #53358F
$fillArea = New-Object System.Drawing.Rectangle(76, 36, 122, 126)
$linBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($fillArea, $brushTop, $brushBottom, [System.Drawing.Drawing2D.LinearGradientMode]::Vertical)
$g.FillEllipse($linBrush, 80, 38, 114, 122)
$linBrush.Dispose()

# 2. Draw the IntervIA Logo Symbol (circle with document + candidate silhouettes)
$logoBytes = [System.IO.File]::ReadAllBytes($logoFile)
$logoMs = New-Object System.IO.MemoryStream(,$logoBytes)
$logo = [System.Drawing.Bitmap]::FromStream($logoMs)

# Target diameter 96px, center=(136.5, 96)
$logoTarget = 96
$lx = [int](136.5 - ($logoTarget / 2)) # 88
$ly = 48
$logoRect = New-Object System.Drawing.Rectangle($lx, $ly, $logoTarget, $logoTarget)

# Draw a glowing subtle white halo ring around the advertising logo
$penHalo = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(200, 255, 255, 255), 2.0)
$g.DrawEllipse($penHalo, ($lx - 2), ($ly - 2), ($logoTarget + 4), ($logoTarget + 4))
$penHalo.Dispose()

$g.DrawImage($logo, $logoRect)
$logo.Dispose()
$logoMs.Dispose()

# 3. Add stylish "intervIA" brand text below the logo on the billboard
$font = New-Object System.Drawing.Font("Arial", 11, [System.Drawing.FontStyle]::Bold)
$textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$stringFormat = New-Object System.Drawing.StringFormat
$stringFormat.Alignment = [System.Drawing.StringAlignment]::Center
$g.DrawString("intervIA", $font, $textBrush, 136.5, 156, $stringFormat)

# Slogan: "L'IA qui vous écoute"
$fontSub = New-Object System.Drawing.Font("Arial", 6.5, [System.Drawing.FontStyle]::Regular)
$subBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(220, 240, 240, 255))
$g.DrawString("L'IA qui vous écoute", $fontSub, $subBrush, 136.5, 172, $stringFormat)

$font.Dispose()
$fontSub.Dispose()
$textBrush.Dispose()
$subBrush.Dispose()
$stringFormat.Dispose()

$g.Dispose()

$encoder = [System.Drawing.Imaging.ImageFormat]::Jpeg
$bmp.Save($destFile, $encoder)
$bmp.Dispose()

# Overwrite case-6.jpg with destination
Copy-Item -Path $destFile -Destination $srcFile -Force
Remove-Item -Path $destFile -Force

Write-Output "Successfully updated case-6.jpg with professional billboard advertisement"
