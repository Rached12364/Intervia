Add-Type -AssemblyName System.Drawing
$imagePath = "c:\Users\rache\intervia\src\assets\livre\storyboard_mohamed_3x3.jpg"
$img = [System.Drawing.Image]::FromFile($imagePath)
Write-Output "Width: $($img.Width), Height: $($img.Height)"
$img.Dispose()
